import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SortableItem from './SortableItem';
import { useAppContext } from '../lib/ContextProvider';

const SortableList: React.FC = () => {
    const { items, moveItem } = useAppContext()

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='w-full'>
                {items.map((item, index) => (
                    <SortableItem key={item.id} item={item} index={index} moveItem={moveItem} />
                ))}
            </div>
        </DndProvider>
    );
};

export default SortableList;