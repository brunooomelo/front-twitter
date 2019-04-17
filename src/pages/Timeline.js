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
`;

const TweetList = styled.div`
  list-style: none;
  color: #1c2022;
`;

function Timeline() {
  const [content, setContent] = useState("");
  const [tweets, setTweets] = useState([]);

  async function getTweets() {
    const response = await api.get("/tweets");
    setTweets(response.data);
  }

  function subscribeToEvents() {
    io.on("tweet", data => {
      setTweets([data, ...tweets]);
    });
  }

  async function handleSubmit(e) {
    if (e.keyCode !== 13) return;
    await api.post('/tweets', { content })
    setContent("")
  }
  useEffect(() => {
    getTweets();
  }, []);

  useEffect(() => {
    subscribeToEvents();
  });

  return (
    <Wrapper>
      <img height={24} src={twitterLogo} alt="GoTwitter" />
      <Form >
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
