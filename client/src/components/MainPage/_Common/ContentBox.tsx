/* eslint-disable jsx-a11y/anchor-is-valid */
import { Col, Divider, message, Rate, Row } from "antd";
import { observer } from "mobx-react";
import { ContentCardInter } from "../../../types";
import parser from "html-react-parser";
import { useCallback } from "react";
import { mainStore } from "../../../@store/store";

interface ContentBoxProps {
  card: ContentCardInter;
  isAcmCard?: boolean;
}

const ContentBox = observer(({ card, isAcmCard }: ContentBoxProps) => {
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
  return (
    <div className="content_box">
      <div className="content_top">
        <h2>
          {isAcmCard && <strong>I recommend you to stay here!</strong>}
          {/* add href soon */}
          <a href="#" target="_blank" rel="noreferrer">
            {card?.title?._text}
          </a>
        </h2>
        {isAcmCard ? (
          <ul>
            <li className="content_list">
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
        ) : (
          <div className="content_subtitle">
            <h3>🗺 {card.addr1?._text}</h3>
            <span onClick={onClickAddTogo} className="tag">
              🌟 Add trip route
            </span>
          </div>
        )}
      </div>
      <Divider />
      <Row className="content_article">
        <Col className="content_article_img" sm={24} md={24} lg={10}>
          <img alt="tour_acm_redcommendation_img" src={card?.firstimage?._text} />
        </Col>
        <Col className="content_article_text" sm={24} md={24} lg={14}>
          <p>{parser(card?.overview._text as string)}</p>
        </Col>
      </Row>
    </div>
  );
});

export default ContentBox;
