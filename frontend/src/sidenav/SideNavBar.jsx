import React, { useState, useContext } from 'react';
import { ContextApi } from '../Context/Context';
import { FaUsers, FaUserPlus, FaBell, FaPen } from 'react-icons/fa';
import Modal from 'react-modal';
import './SideNavBar.css';
import { services } from '../services/Services';
import { Link } from 'react-router-dom';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '600px',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
};

const SideNavBar = () => {
  const { loggedUser } = useContext(ContextApi);
  console.log(loggedUser);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');

  const pendingUsers = loggedUser?.pending || [];
  const followersCount = loggedUser?.followers?.length || 0;
  const followingCount = loggedUser?.following?.length || 0;
  const pendingCount = loggedUser?.pendingRequests?.length || 0;

  const openModal = (type) => {
    setModalContent(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsArticleModalOpen(false);
  };

  const handleRequestAction = (action, userId) => {
    if (action === 'reject') {
      rejectRequest(userId);
    } else if (action === 'accept') {
      acceptRequest(userId);
    } else if (action === 'send') {
      sendFollowRequest(userId);
    }
  };

  const rejectRequest = async (followerId) => {
    try {
      const response = await fetch('http://localhost:5000/api/follow/reject-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
           Authorization:`Bearer ${sessionStorage.getItem("Token")}`
        },
        body: JSON.stringify({ followerId }),
      });
      const data = await response.json();
      if (data.message === 'Follow request rejected') {
        closeModal();
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const acceptRequest = async (followerId) => {
    try {
      const response = await fetch('http://localhost:5000/api/follow/accept-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
           Authorization:`Bearer ${sessionStorage.getItem("Token")}`
         },
        body: JSON.stringify({ followerId }),
      });
      const data = await response.json();
      if (data.message === 'Follow request accepted') {
        closeModal();
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const sendFollowRequest = async (targetUserId) => {
    try {
      const response = await fetch('/api/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId }),
      });
      const data = await response.json();
      if (data.message === 'Follow request sent') {
        closeModal();
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const handleAddArticle = () => {
    setIsArticleModalOpen(true);
  };

  const handleSubmitArticle = async () => {
    if (!articleTitle || !articleContent) return alert('Please fill in both fields');
    try {
      let payload={title:articleTitle,content:articleContent}
      services.addArticle(payload)
     
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  const renderUserCards = (type) => {
    let users = [];
    if (type === 'Followers') users = loggedUser?.followers || [];
    if (type === 'Following') users = loggedUser?.following || [];
    if (type === 'Pending') users =loggedUser.pendingRequests || [];

    return users.length > 0 ? (
      <div className="cards-container">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <img
              className="user-card-image"
              src={`data:image/jpeg;base64,${user.profilePhoto}`}
              alt={user.username}
              height={100}
              width={100}
            />
            <div className="user-card-details">
              <h3>{user.username}</h3>
              <p>{user.email}</p>
              {modalContent === 'Pending' && (
                <>
                  <button onClick={() => handleRequestAction('accept', user._id)}>Accept Request</button>
                  <button onClick={() => handleRequestAction('reject', user._id)}>Reject Request</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>No {type.toLowerCase()} available.</p>
    );
  };

  return (
    <div className="sidebar">
      <div className="profile-section">
        <img
          className="profile-image"
          src={`data:image/jpeg;base64,${loggedUser?.profilePhoto}`}
          height={200}
          width={200}
          alt="Profile"
        />
        <div className="profile-details">
          <h2 className="username">{loggedUser?.username}</h2>
        </div>
      </div>

      <div className="nav-items">
        <div className="nav-item" onClick={() => openModal('Followers')}>
          <div className="nav-icon">
            <FaUsers size={30} />
            <div className="badge">{followersCount}</div>
          </div>
        </div>

        <div className="nav-item" onClick={() => openModal('Following')}>
          <div className="nav-icon">
            <FaUserPlus size={30} />
            <div className="badge">{followingCount}</div>
          </div>
        </div>

        <div className="nav-item" onClick={() => openModal('Pending')}>
          <div className="nav-icon">
            <FaBell size={30} />
            <div className="badge">{pendingCount}</div>
          </div>
        </div>

        <div className="nav-item" onClick={handleAddArticle}>
          <div className="nav-icon">
            <FaPen size={30} />
          </div>
        </div>

        <div><button><Link to={"/sendRequest"}>Click</Link></button></div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Modal"
      >
        <h2>{modalContent} List</h2>
        {renderUserCards(modalContent)}
        <button onClick={closeModal}>Close</button>
      </Modal>

      <Modal
        isOpen={isArticleModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Add Article"
      >
        <h2>Add New Article</h2>
        <div className="form-group">
          <label htmlFor="articleTitle">Article Title</label>
          <input
            id="articleTitle"
            type="text"
            aria-label="Enter Article Title"
            placeholder="Article Title"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="articleContent">Article Content</label>
          <textarea
            id="articleContent"
            aria-label="Enter Article Content"
            placeholder="Article Content"
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)}
          />
        </div>
        <button
          className="submit"
          onClick={handleSubmitArticle}
          disabled={!articleTitle || !articleContent}
        >
          Submit Article
        </button>
        <button className="close" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default SideNavBar;
