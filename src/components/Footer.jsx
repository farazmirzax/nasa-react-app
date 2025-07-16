import { useState } from 'react';

export default function Footer(props){
    const {showModal, handleToggleModal, data} = props;
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        const newLiked = !liked;
        setLiked(newLiked);
        if (newLiked) {
            localStorage.setItem(`liked-${data.date}`, JSON.stringify(data));
        } else {
            localStorage.removeItem(`liked-${data.date}`);
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: data.title,
            text: data.explanation,
            url: data.hdurl || data.url,
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

    return(
        <footer>
            <div className="bgGradient"></div>
            <div>
               <h1>Astronomy Picture of the Day</h1>
               <h2>{data?.title}</h2>
            </div>
            <div className="footer-buttons">
                <button onClick={handleLike}>
                    <i className={`fa-solid fa-heart ${liked ? 'liked' : ''}`}></i>
                </button>
                <button onClick={handleShare}>
                    <i className="fa-solid fa-share-alt"></i>
                </button>
                <button onClick={handleToggleModal}>
                    <i className="fa-solid fa-circle-info"></i>
                </button>
            </div>
        </footer>
    );
}