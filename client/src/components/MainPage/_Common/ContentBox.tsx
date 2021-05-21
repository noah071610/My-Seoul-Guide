import { Col, Divider, message, Rate, Row } from "antd";
import { observer } from "mobx-react";
import { ContentCardInter } from "../../../types";
import parser from "html-react-parser";
import { useCallback } from "react";
import { mainStore } from "../../../@store/store";
import { useHistory } from "react-router";
import { BLUE_COLOR, LG_SIZE, NO_IMAGE_URL, SM_SIZE, WHITE_COLOR } from "../../../config";
import styled from "@emotion/styled";

const Content = styled.div`
  padding: 2rem;
  width: 100%;
  .content {
    &_top {
      &_title {
        display: flex;
        align-items: center;
        margin-bottom: 0.8rem;
        font-size: 1.3rem;
        .title_name {
          font-family: "Kaushan Script", cursive;
          font-size: 1.7rem;
          margin-left: 1rem;
        }
      }
      &_subtitle {
        display: flex;
        justify-content: space-between;
        .content_list {
          display: flex;
          .content_rate {
            margin-right: 1rem;
          }
          .content_tag {
            user-select: none;
            margin-right: 0.5rem;
            &:hover {
              transform: scale(1.05);
            }
          }
        }
        .addBtn {
          cursor: pointer;
          margin-left: 1rem;
          transition: 0.3s all;
        }
      }
    }

    &_article {
      &_img {
        border-radius: 10px;
        img {
          width: 100%;
          height: 250px;
          border-radius: 8px;
        }
      }
      &_text,
      &_text_attractions {
        padding-left: 1.5rem;
        font-size: 0.9rem;
        line-height: 2.2;
        height: 250px;
        overflow-y: auto;
        p {
          height: 250px;
        }
      }
    }
  }
  @media only screen and (max-width: ${LG_SIZE}) {
    padding: 1rem;
    .content {
      &_article {
        &_text {
          padding: 1rem 0 2rem 0;
          height: 100%;
          p {
            height: 100%;
          }
        }
        &_text_attractions {
          margin: 1rem 0 1.5rem 0;
          padding: 0;
          height: 150px;
          p {
            height: 100%;
          }
        }
      }
    }
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    .content {
      &_top {
        &_title {
          .title_desc {
            display: none;
          }
          .title_name {
            margin: 0 1rem 0 0;
          }
        }
        &_subtitle {
          display: flex;
          flex-direction: column-reverse;
          .content_list {
            .content_rate {
              display: none;
            }
            .content_tag {
              margin-top: 0.5rem;
              font-size: 0.6rem;
            }
          }
          .addBtn {
            display: none;
          }
        }
      }
      &_article {
        &_img {
          img {
            height: 150px;
          }
          button {
            font-size: 0.9rem;
            position: absolute;
            bottom: 10px;
            right: 5px;
            background-color: ${BLUE_COLOR};
            color: ${WHITE_COLOR};
            display: inline-block;
            padding: 0 0.5rem;
            border-radius: 5px;
            transition: 0.3s all;
            &:hover {
              color: black;
              background-color: ${WHITE_COLOR};
            }
          }
        }
        &_text {
          padding: 0 0 1rem 0;
          height: 100%;
          p {
            height: 100%;
          }
        }
      }
    }
  }
`;

interface ContentBoxProps {
  card: ContentCardInter;
  isAcmCard?: boolean;
}

const ContentBox = observer(({ card, isAcmCard }: ContentBoxProps) => {
  const history = useHistory();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onClickSetbase = useCallback(() => {
    message.success("Successfully set your main place for trip");
    history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Content>
      <div className="content_top">
        <h2 className="content_top_title">
          <span className="title_desc">{isAcmCard && "We recommend you to stay here!"}</span>
          <span className="title_name">{card?.title?._text}</span>
          {isAcmCard && (
            <Rate
              className="title_rate sm_visible"
              style={{ fontSize: "1rem" }}
              disabled
              value={card?.rate}
            />
          )}
        </h2>
        {isAcmCard ? (
          <div className="content_top_subtitle">
            <ul className="content_list">
              <li className="content_rate">
                <Rate style={{ fontSize: "1rem" }} disabled value={card?.rate} />
              </li>
              {card?.tags?.map((tag, i) => {
                return (
                  <li key={i} className="content_tag tag">
                    {tag}
                  </li>
                );
              })}
            </ul>
            <span onClick={onClickSetbase} className="addBtn tag">
              🌟 Set base place
            </span>
          </div>
        ) : (
          <div className="content_top_subtitle">
            <h3>🗺 {card.addr1?._text}</h3>
            <span onClick={onClickAddTogo} className="addBtn tag">
              🌟 Add trip route
            </span>
          </div>
        )}
      </div>
      <Divider />
      <Row className="content_article">
        <Col className="content_article_img" sm={24} md={24} lg={10}>
          <img alt="tour_acm_redcommendation_img" src={card?.firstimage?._text || NO_IMAGE_URL} />
          {isAcmCard ? (
            <button onClick={onClickSetbase} className="sm_visible">
              🌟 Set base place
            </button>
          ) : (
            <button onClick={onClickAddTogo} className="sm_visible">
              🌟 Add trip route
            </button>
          )}
        </Col>
        <Col
          className={isAcmCard ? "content_article_text" : "content_article_text_attractions"}
          sm={24}
          md={24}
          lg={14}
        >
          <p>{parser(card?.overview._text as string)}</p>
        </Col>
      </Row>
    </Content>
  );
});

export default ContentBox;
