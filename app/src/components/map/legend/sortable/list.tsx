import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  useCallback,
  useId,
  useMemo,
  useState,
} from "react";

import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  UniqueIdentifier,
  DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItemProps, SortableListProps } from "@/components/map/legend/types";

import SortableItem from "./item";

export const SortableList: React.FC<SortableListProps> = ({
  children,
  sortable,
  onChangeOrder,
}: SortableListProps) => {
  const uid = useId();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const ActiveItem = useMemo(() => {
    const activeChildArray = Children.map(children, (Child) => {
      if (isValidElement(Child)) {
        const { props } = Child as ReactElement<SortableItemProps>;
        const { id } = props;

        if (id === activeId) {
          return Child;
        }
        return null;
      }
      return null;
    });

    return activeChildArray?.length ? activeChildArray[0] : null;
  }, [children, activeId]);

  const itemsIds = useMemo(() => {
    return (
      Children?.map(children, (Child) => {
        if (isValidElement(Child)) {
          const { props } = Child as ReactElement<SortableItemProps>;
          const { id } = props;
          return id;
        }
      }) || []
    );
  }, [children]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    if (!active) return;
    setActiveId(active.id);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (active.id !== over?.id) {
        const oldIndex = itemsIds?.indexOf(`${active.id}`) || 0;
        const newIndex = itemsIds?.indexOf(`${over?.id}`) || 0;
        if (onChangeOrder) onChangeOrder(arrayMove(itemsIds || [], oldIndex, newIndex));
      }
    },
    [itemsIds, onChangeOrder],
  );

  return (
    <DndContext
      id={uid}
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={itemsIds} strategy={verticalListSortingStrategy}>
        {Children.map(children, (Child) => {
          if (isValidElement(Child)) {
            const {
              props: { id },
            } = Child as ReactElement<SortableItemProps>;

            return (
              <SortableItem id={id} sortable={sortable}>
                {cloneElement(Child as ReactElement<SortableItemProps>, {
                  sortable,
                })}
              </SortableItem>
            );
          }
          return null;
        })}
      </SortableContext>

      <DragOverlay>
        {isValidElement(ActiveItem) && (
          <div className="flex max-h-[calc(100vh_-_theme(space.16)_-_theme(space.6)_-_theme(space.48)_-_theme(space.40))] flex-col overflow-hidden">
            {cloneElement(ActiveItem as ReactElement<SortableItemProps>, {
              sortable,
            })}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default SortableList;
