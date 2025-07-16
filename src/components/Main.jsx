export default function Main(props) {
    const { data } = props;

    const handleShare = async () => {
        const shareData = {
            title: data.title,
            text: data.explanation,
            url: data.url,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                navigator.clipboard.writeText(shareData.url);
                alert("Link copied to clipboard!");
            }
        } catch (error) {
            console.error('Error sharing', error);
        }
    };

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
            <div className="video-container">
          <iframe
            src={data.url}
            title={data.title || "NASA Video"}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            className="bgVideo"
          ></iframe>
          <button onClick={handleShare} className="share-button-video">
              <i className="fa-solid fa-share-alt"></i>
          </button>
          </div>
        )}
      </div>
    );
  }