import React, { useState, useEffect } from "react";
import styled from "styled-components";
import twitterLogo from "../twitter.svg";
import api from "../services/api";
import io from "../services/socket";
import Tweet from "../components/Tweet";

const Wrapper = styled.div`
  width: 600px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Form = styled.form`
  width: 100%;
  background: #e9f1f6;
  padding: 20px;
  border-radius: 5px;
  margin: 30px 0;
`;
const TextArea = styled.textarea`
  border: 3px solid #d8e5ed;
  border-radius: 5px;
  font-size: 14px;
  padding: 15px;
  width: 100%;
  resize: none;
  margin-bottom: 30px;
`;

const TweetList = styled.div`
  list-style: none;
  color: #1c2022;
`;

function Timeline({ history }) {
  const [content, setContent] = useState("");
  const [tweets, setTweets] = useState([]);

  async function getTweets() {
    try {
      const { token } = JSON.parse(localStorage.getItem("@twitter"));
      const response = await api.get("/tweets", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTweets(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear("@twitter");
        return history.push("/");
      }
      return error;
    }
  }

  function subscribeToEvents() {
    io.on("tweet", data => {
      setTweets([data, ...tweets]);
    });
    io.on("like", data => {
      setTweets([
        ...tweets.map(tweet =>
          tweet._id === data._id ? { ...tweet, likes: data.likes } : tweet
        )
      ]);
    });
  }

  async function handleSubmit(e) {
    if (e.keyCode !== 13) return;
    try {
      const { token } = JSON.parse(localStorage.getItem("@twitter"));
      await api.post(
        "/tweets",
        { content },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setContent("");
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear("@twitter");
        return history.push("/");
      }
      return error;
    }
  }

  useEffect(() => {
    getTweets();
  }, []);

  useEffect(() => {
    subscribeToEvents();
  });

  return (
    <Wrapper>
      <img height={50} src={twitterLogo} alt="GoTwitter" />
      <Form>
        <TextArea
          placeholder="O que está acontecendo?"
          value={content}
          onChange={e => setContent(e.target.value)}
          onKeyDown={handleSubmit}
        />
        <TweetList>
          {tweets.map(tweet => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </TweetList>
      </Form>
    </Wrapper>
  );
}

export default Timeline;
