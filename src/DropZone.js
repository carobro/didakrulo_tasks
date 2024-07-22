import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop, accepts }) => {
    const [{ isOver }, drop] = useDrop({
        accept: accepts,
        drop: onDrop,
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const backgroundColor = isOver ? 'lightgreen' : 'white';

    return (
        <div
            ref={drop}
            style={{
                backgroundColor,
                minHeight: '6rem',
                padding: '1rem',
                marginBottom: '1rem',
                border: '1px dashed gray',
            }}
        >
            Drop here
        </div>
    );
};

export default DropZone;
