  import React, { useEffect, useState } from 'react';
  import { FaRegHeart, FaHeart } from 'react-icons/fa'; // Heart icon (unfilled and filled)
  import styled from 'styled-components'; // Import styled-components
  import { services } from '../services/Services';
  import { data, useNavigate } from 'react-router-dom';

  const GetArticles = () => {
    let [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allComment,setAllComment]=useState([])
  let navigate=useNavigate()
    useEffect(() => {
      const fetchArticles = async () => {
        try {
          let data = await services.getArticle(); // Fetch articles from service
          setArticles(data||[]); // Set fetched data to the state
          setLoading(false);  // Set loading to false once data is fetched
          setAllComment(articles.map((val)=>val.comments));
          // console.log(allComment);
          
        } catch (err) {
          setError('Error fetching articles');
          setLoading(false);
        }
      };
      
      fetchArticles();
      // console.log(articles);

    }, [window.sessionStorage.getItem('Token'), data.length,allComment.length]); // Dependency on token (for re-fetching)
  
    

    const handleCommentSubmit = (e, articleId, comment) => {
      e.preventDefault();
      let payload = { text: comment };
      (async()=>{
        let data =await services.addComment(payload, articleId); 
        setAllComment(data.article.comments)
      
      })();
  
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
      <div>
        {articles?.map((article) => (
          <Article key={article._id} article={article} onCommentSubmit={handleCommentSubmit} />
        ))}
      </div>
    );
  };

  const Article = ({ article, onCommentSubmit }) => {
    const { title, content, user, likeCount, _id, createdAt, comments } = article;
    const { email } = user;

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(likeCount);
    const [comment, setComment] = useState('');

    const handleLike = () => {
      setLiked(!liked);
      setLikes(liked ? likes - 1 : likes + 1);
    };

    const handleCommentChange = (e) => {
      setComment(e.target.value);
    };

    const formattedDate = new Date(createdAt).toLocaleDateString();

    return (
      <ArticleCard>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <AuthorInfo>Posted by: {email}</AuthorInfo>
        <CreatedAt>Created at: {formattedDate}</CreatedAt>

        <LikeSection>
          <LikeButton onClick={handleLike}>
            {liked ? <FaHeart color="red" size={24} /> : <FaRegHeart size={24} />}
            <LikeCount>{likes}</LikeCount>
          </LikeButton>
        </LikeSection>

        <CommentSection>
          <h3>Comments</h3>
          {comments?.length > 0 ? (
            <CommentList>
              {comments.map((comment, index) => (
                <CommentItem key={index}>{comment.text}</CommentItem>
              ))}
            </CommentList>
          ) : (
            <NoComments>No comments yet.</NoComments>
          )}

          <form onSubmit={(e) => onCommentSubmit(e, _id, comment)}>
            <CommentInput
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              rows="3"
            />
            <SubmitButton type="submit">Submit Comment</SubmitButton>
          </form>
        </CommentSection>
      </ArticleCard>
    );
  };

  // Styled-components for styling
  const ArticleCard = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
  `;

  const Title = styled.h2`
    font-size: 22px;
    color: #333;
  `;

  const Content = styled.p`
    font-size: 16px;
    color: #555;
  `;

  const AuthorInfo = styled.p`
    font-size: 14px;
    color: #777;
  `;

  const CreatedAt = styled.p`
    font-size: 14px;
    color: #777;
  `;

  const LikeSection = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
  `;

  const LikeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  `;

  const LikeCount = styled.span`
    margin-left: 8px;
    font-size: 16px;
    color: #555;
  `;

  const CommentSection = styled.div`
    margin-top: 20px;
  `;

  const CommentList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    margin-top: 10px;
  `;

  const CommentItem = styled.li`
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
  `;

  const NoComments = styled.p`
    font-style: italic;
    color: #888;
  `;

  const CommentInput = styled.textarea`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  `;

  const SubmitButton = styled.button`
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049;
    }
  `;

  export default GetArticles;
