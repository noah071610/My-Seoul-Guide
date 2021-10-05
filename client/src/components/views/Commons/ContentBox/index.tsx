import { Col, Divider, message, Rate, Row } from "antd";
import { observer } from "mobx-react";
import { ContentCardInter } from "types";
import parser from "html-react-parser";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { ContentBoxWrapper } from "./styles";
import { NO_IMAGE_URL } from "config";

interface ContentBoxProps {
  card: ContentCardInter;
  isAcmCard?: boolean;
}

const ContentBox = observer(({ card, isAcmCard }: ContentBoxProps) => {
  const history = useHistory();

  const onClickSetbase = useCallback(() => {
    message.success("Successfully set your main place for trip");
    history.push("/");
  }, []);
  return (
    <ContentBoxWrapper>
      <div className="content_top">
        <h2 className="content_top_title">
          {isAcmCard && <span className="title_desc">We recommend you to stay here!</span>}
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
      </div>
      <Divider />
      <Row className="content_article">
        <Col className="content_article_img" sm={24} md={24} lg={10}>
          <img alt="tour_acm_redcommendation_img" src={card?.firstimage?._text || NO_IMAGE_URL} />
          <button onClick={onClickSetbase} className="sm_visible">
            🌟 Set base place
          </button>
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
    </ContentBoxWrapper>
  );
});

export default ContentBox;
