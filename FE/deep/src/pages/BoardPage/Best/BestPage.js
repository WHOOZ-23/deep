import likesIcon from "../../../assets/images/deep-icon-likes.svg";
import commentsIcon from "../../../assets/images/deep-icon-comments.svg";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import { BestContainer, BestWrapper } from "./BestPage.styles";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function BestPage() {
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    const member = useSelector((state) => state.member.value);

    useEffect(() => {
        axiosInstance
            .get("/deep/board/best?page=1")
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const postCreatedTime = posts.map((post) => {
        const date = new Date(post.boardCreatedTime);
        date.setHours(date.getHours() + 9);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        const formattedDate = `${year}.${month}.${day}`;

        return formattedDate;
    });

    const handleClickProfile = (e, nickname, random) => {
        const userRandom = random.replace("#", "");

        if (
            member.memberNickName === nickname &&
            member.memberRandom === random
        ) {
            navigate(`/profile/${userRandom}`);
        } else {
            navigate(`/profile/${nickname}/${userRandom}`);
        }
    };

    const handleClickPost = (e, index) => {
        navigate(`/${posts[index].category}/${posts[index].boardNo}`);
    };

    return (
        <BestWrapper>
            <BestContainer>
                <div className="board_header">
                    <h3 className="board_title">인기글</h3>
                </div>
                <ul className="posts">
                    {posts.map((post, index) => {
                        return (
                            <li className="post">
                                <div
                                    className="user_profile"
                                    onClick={(e) =>
                                        handleClickProfile(
                                            e,
                                            post.memberNickName,
                                            post.memberRandom
                                        )
                                    }
                                >
                                    {post.memberFile === null ? (
                                        <img
                                            className="user_profile_img"
                                            src={userProfile}
                                            alt="user-profile-image"
                                        />
                                    ) : (
                                        <img
                                            className="user_profile_img"
                                            src={post.memberFile}
                                            alt="user-profile-image"
                                        />
                                    )}
                                    <span className="user_name">
                                        {post.memberNickName}
                                    </span>
                                    <span className="user_random">
                                        {post.memberRandom}
                                    </span>
                                </div>
                                <div onClick={(e) => handleClickPost(e, index)}>
                                    <h4 className="post_title">
                                        {post.boardTitle}
                                    </h4>
                                    <p
                                        className="post_content"
                                        dangerouslySetInnerHTML={{
                                            __html: post.boardContent,
                                        }}
                                    ></p>
                                    <div className="contents_container">
                                        <div className="content_time">
                                            <span>
                                                {postCreatedTime[index]}
                                            </span>
                                        </div>
                                        <div className="contents_item">
                                            <span className="likes">
                                                <img
                                                    src={likesIcon}
                                                    alt="likes-icon"
                                                />
                                                <span>{post.like}</span>
                                            </span>
                                            <span className="comments">
                                                <img
                                                    src={commentsIcon}
                                                    alt="comments-icon"
                                                />
                                                <span>{post.reply}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </BestContainer>
        </BestWrapper>
    );
}

export default BestPage;
