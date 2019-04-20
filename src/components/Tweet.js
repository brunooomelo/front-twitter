import React from "react";
import styled from "styled-components";
import like from "../like.svg";
import api from "../services/api";

const Wrapper = styled.li`
  padding: 20px 20px 0;
  margin: 20px 0 0;
  border-top: 1px solid #eee;
  &:first-child {
    margin-top: 0;
    padding-top: 0;
    border: 0;
  }
`;

const Content = styled.p`
  margin: 15px 0;
  font-size: 14px;
  line-height: 20px;
`;

const Button = styled.button`
  border: 0;
  background: transparent;

  display: flex;
  align-items: center;
  color: #697882;
  cursor: pointer;
  &::hover {
    opacity: 0.7;
  }
`;

const Image = styled.img`
  margin-right: 5px;
`;

function Tweet({ tweet, history }) {
  async function handleLike() {
    try {
      const { _id } = tweet;
      const { token } = JSON.parse(localStorage.getItem('@twitter'))
      await api.post(`/likes/${_id}`,{},{
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      if(error.response.status === 401) {
        localStorage.clear('@twitter')
        return history.push('/')
      }
      return error
    }
  }
  return (
    <Wrapper>
      <strong>{tweet.author.name}</strong>
      <Content>{tweet.content}</Content>
      <Button type="button" onClick={handleLike}>
        <Image src={like} alt="Like" />
        {tweet.likes}
      </Button>
    </Wrapper>
  );
}

export default Tweet;
