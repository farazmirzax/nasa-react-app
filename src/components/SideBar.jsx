export default function SideBar(props){
    const {handleToggleModal, data} = props;
    return(
        <div className="sidebar">
            <div onClick={handleToggleModal} className="bgOverlay"></div>
            <div className="sidebarContents">    
                <h2>{data?.title}</h2>
                <div className="descriptionContainer">
                    {/* This now correctly displays the date from the data prop */}
                    <p className="descriptionTitle">{data?.date}</p>
                    <p>{data?.explanation}</p>
                </div>
                <button onClick={handleToggleModal} aria-label="Close information panel">
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    )
}
