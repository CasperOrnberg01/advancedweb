const Popup = ({ close }) => {
    return (
      <div id="popup">
        <div className="popup-content">
          <p>Kiitos viestistäsi! Otamme sinuun yhteyttä pian.</p>
          <button onClick={close}>OK</button>
        </div>
      </div>
    );
  };
  
  export default Popup;
  