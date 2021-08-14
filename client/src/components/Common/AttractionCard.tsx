import styled from "@emotion/styled";
import { message } from "antd";
import React, { FC, useCallback } from "react";
import { NO_IMAGE_URL, SM_SIZE } from "../../config";
import { mainStore } from "../../store/store";
import { ContentCardInter } from "../../types";

const AttractionCardWrapper = styled.article`
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
  &:hover {
    .overlay {
      opacity: 0.6;
    }
    .overlay-title {
      opacity: 1;
    }
  }
  .overlay {
    transition: 0.3s all;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: black;
    opacity: 0;
  }
  .overlay-title {
    width: 100%;
    z-index: 1;
    position: absolute;
    padding: 1rem 1rem 1rem 2.5rem;
    bottom: 0;
    right: 0;
    opacity: 0;
    h2 {
      text-align: end;
      font-weight: bold;
      color: white;
      font-size: 1rem;
    }
    h3 {
      margin-top: 0.5rem;
      text-align: end;
      color: white;
      font-size: 0.8rem;
    }
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    height: 300px;
    &:hover {
      .overlay {
        opacity: 0;
      }
    }
    .overlay-title {
      opacity: 1;
      background: rgba(0, 0, 0, 0.3);
      padding-left: 4rem;
      h2 {
        text-align: end;
        font-weight: bold;
        color: white;
        font-size: 1.35rem;
      }
      h3 {
        margin-top: 0.5rem;
        text-align: end;
        color: white;
        font-size: 0.9rem;
      }
    }
  }
`;

interface IProps {
  card: ContentCardInter;
}

const AttractionCard: FC<IProps> = ({ card }) => {
  const onClickAddTogo = useCallback(() => {
    let form = {
      path: {
        lat: Number(card.mapy?._text),
        lng: Number(card.mapx?._text),
      },
      title: card.title?._text,
      contentid: card.contentid?._text as string,
    };
    mainStore.addTogoList(form);
    message.success("Successfully added! check Home out 🤩");
  }, [card]);
  return (
    <AttractionCardWrapper
      onClick={onClickAddTogo}
      style={{
        background: `url(${
          card.firstimage?._text || NO_IMAGE_URL
        }) no-repeat center center / 100% 100%`,
      }}
    >
      <div className="overlay-title">
        <h2>{card.title._text}</h2>
        <h3>🌟 Click And Add route</h3>
      </div>
      <div className="overlay" />
    </AttractionCardWrapper>
  );
};

export default AttractionCard;
