export default function Main(props) {
    const { data } = props;
  
    return (
      <div className="imgContainer">
        {data.media_type === "image" && (
          <img
            src={data.hdurl || data.url}
            alt={data.title || "bg-image"}
            className="bgImage"
          />
        )}
        {data.media_type === "video" && (
          <iframe
            src={data.url}
            title={data.title || "NASA Video"}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            className="bgVideo"
          ></iframe>
        )}
      </div>
    );
  }
  