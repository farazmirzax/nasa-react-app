import ApodDatePicker from "./ApodDatePicker";

export default function SideBar(props) {
  const { handleToggleModal, data, fetchApodForDate } = props;

  return (
    <div className="sidebar">
      <div onClick={handleToggleModal} className="bgOverlay"></div>
      <div className="sidebarContents">
        <h2>{data?.title}</h2>
        <div className="descriptionContainer">
          {/* 🎯 Replaces the old date with the date picker */}
          <ApodDatePicker onDateChange={fetchApodForDate} />
          <p>{data?.explanation}</p>
        </div>
        <button onClick={handleToggleModal}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
