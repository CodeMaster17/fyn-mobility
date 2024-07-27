import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Item } from '../constants';

const ItemType = 'ITEM';


const SortableItem: React.FC<{ item: Item; index: number; moveItem: (fromIndex: number, toIndex: number) => void }> = ({ item, index, moveItem }) => {

    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag, dragPreview] = useDrag({
        type: ItemType,
        item: { id: item.id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover(draggedItem: { index: number }) {
            if (!ref.current) {
                return;
            }
            const dragIndex = draggedItem.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveItem(dragIndex, hoverIndex);
            draggedItem.index = hoverIndex;
        },
    });

    drag(drop(ref));

    return (
        <div ref={ref} className='item' style={{ opacity: isDragging ? 0.5 : 1, padding: '8px', border: '1px solid #ccc', margin: '4px 0', fontSize: '2rem', background: isDragging ? '#36C2CE' : '#478CCF' }}>
            <button ref={dragPreview} style={{ marginRight: '8px', cursor: 'move' }}>
                <span role="img" aria-label="drag-handle"> ≡ </span>
            </button>
            {item.text}
        </div>
    );
};
export default SortableItem
