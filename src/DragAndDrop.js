import React, { useState, useRef } from 'react';
import { ResizableBox } from 'react-resizable';
import './DragAndDrop.css';
import 'react-resizable/css/styles.css';

const DragAndDrop = () => {
  const [dropZones, setDropZones] = useState([]);
  const [draggableItems, setDraggableItems] = useState([]);
  const [isSetupMode, setIsSetupMode] = useState(true);
  const [dropZoneIdCounter, setDropZoneIdCounter] = useState(1);
  const [draggableItemIdCounter, setDraggableItemIdCounter] = useState(1);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleAddDropZone = () => {
    setDropZones([
      ...dropZones,
      { id: dropZoneIdCounter, x: '', y: '', width: 80, height: 40, content: '' }
    ]);
    setDropZoneIdCounter(dropZoneIdCounter + 1);
  };

  const handleAddDraggableItem = () => {
    setDraggableItems([
      ...draggableItems,
      { id: draggableItemIdCounter, content: '' }
    ]);
    setDraggableItemIdCounter(draggableItemIdCounter + 1);
  };

  const handleDropZoneChange = (id, field, value) => {
    setDropZones(
      dropZones.map(zone =>
        zone.id === id ? { ...zone, [field]: value } : zone
      )
    );
  };

  const handleDraggableItemChange = (id, value) => {
    setDraggableItems(
      draggableItems.map(item =>
        item.id === id ? { ...item, content: value } : item
      )
    );
  };

  const handleFinishSetup = () => {
    setIsSetupMode(false);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleResize = (id, width, height) => {
    setDropZones(
      dropZones.map(zone =>
        zone.id === id ? { ...zone, width, height } : zone
      )
    );
  };


  const handleDrop = (e, zoneId) => {
    const itemId = e.dataTransfer.getData('text/plain');
    const zone = dropZones.find(zone => zone.id === zoneId);
    if (zone.content == itemId) {
      setDropZones(
        dropZones.map(zone =>
          zone.id === zoneId ? { ...zone, droppedItem: itemId } : zone
        )
      );
    } else {
      console.log('Incorrect item. It will jump back to its original position.');
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="drag-and-drop">
      {isSetupMode ? (
        <>
          <div className="setup-container">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <div>
            <button onClick={handleAddDraggableItem}>Definiere neues Objekt</button>
            </div>
            {draggableItems.map(item => (
              <div key={item.id} className="draggable-item-setup">
                <label>Objekt {item.id}</label>
                <input
                  type="text"
                  placeholder="Objekt 1"
                  value={item.content}
                  onChange={e =>
                    handleDraggableItemChange(item.id, e.target.value)
                  }
                />
              </div>
            ))}
            <div>
            <button  onClick={handleAddDropZone}>Erstelle neue Zone</button>
            </div>
            {dropZones.map(zone => (
              <div key={zone.id} className="drop-zone-setup">
                <label>Zone {zone.id}</label>
                <input
                  type="number"
                  placeholder="x-Position"
                  value={zone.x}
                  onChange={e =>
                    handleDropZoneChange(zone.id, 'x', e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="y-Position"
                  value={zone.y}
                  onChange={e =>
                    handleDropZoneChange(zone.id, 'y', e.target.value)
                  }
                />
                <select
                  value={zone.content}
                  onChange={e =>
                    handleDropZoneChange(zone.id, 'content', e.target.value)
                  }
                >
                  <option value="">Wähle entsprechendes Objekt</option>
                  {draggableItems.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.content || `Objekt ${item.id}`}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <button onClick={handleFinishSetup}>Starte Game</button>
          </div>
          <div className="image-preview-container">
            {uploadedImage && (
              <div className="image-container">
                <img
                  src={uploadedImage}
                  alt="background"
                  className="background-image"
                />
                {dropZones.map(zone => (
                  <div
                    key={zone.id}
                    className="drop-zone"
                    style={{ left: `${zone.x}px`, top: `${zone.y}px` }}
                  >
                    {zone.content && (
                      <div className="dropped-item">
                        { draggableItems.find(item => item.id == zone.content).content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="image-container">
            {dropZones.map(zone => (
              <div
                key={zone.id}
                className="drop-zone"
                style={{ left: `${zone.x}px`, top: `${zone.y}px` }}
                onDragOver={e => e.preventDefault()}
                onDrop={e => handleDrop(e, zone.id)}
              >
                {zone.droppedItem && (
                  <div className="dropped-item">
                    {draggableItems.find(item => item.id == zone.droppedItem).content}
                  </div>
                )}
              </div>
            ))}
            <img  src={uploadedImage}
              alt="background"
              className="background-image"
            />
          </div>
          <div className="draggable-items">
            {draggableItems.map(item => (
              <div
                key={item.id}
                className="draggable-item"
                draggable
                onDragStart={e => handleDragStart(e, item.id)}
              >
                {item.content}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DragAndDrop;
