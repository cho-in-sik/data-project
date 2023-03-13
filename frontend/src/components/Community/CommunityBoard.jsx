import React, { useState, useEffect } from 'react';
import axios from 'axios';
//게시판 목록
function CommunityBoard() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/data/community.json');
        setCommunities(response.data.communities);
      } catch (error) {
        // 에러 발생 시 처리
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>게시판 목록</h1>
      {communities.map((community) => (
        <div key={community._id}>
          <h3>{community.title}</h3>
          <p>작성자: {community.author}</p>
        </div>
      ))}
    </div>
  );
}

export default CommunityBoard;
