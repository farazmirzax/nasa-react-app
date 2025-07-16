// src/components/SpaceLoader.jsx

export default function SpaceLoader() {
  return (
    <div className="loader-container">
      <div className="planet">
        <div className="ring"></div>
        <div className="cover-ring"></div>
        <div className="spots">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <p>LOADING</p>
    </div>
  );
}
