import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Item } from '../constants';
import { GripVertical } from 'lucide-react';
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
        <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1, padding: '8px', margin: '1rem 0', fontSize: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='drag-button' >
                <button ref={dragPreview} style={{ marginRight: '', cursor: 'move' }} className='drag-button'>
                    <span aria-label="drag-handle">
                        <GripVertical
                            className='grip-icon'
                        />
                    </span>
                </button>
            </div>
            <div className='drag-text' style={{ background: isDragging ? '#36C2CE' : '#FFF' }}>
                {item.text}
            </div>
        </div>
    );
};
export default SortableItem
