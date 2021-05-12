import { Col, Divider, Rate, Row } from "antd";
import { observer } from "mobx-react";
import { mainStore } from "../../../@store/store";

const ArticleBox = observer(() => {
  return (
    <div className="article_box">
      <div className="article_header">
        <h2>
          <strong>I recommend you to stay here!</strong>
          <a href={mainStore.acmCard?.href} target="_blank" rel="noreferrer">
            {mainStore.acmCard?.name}
          </a>
        </h2>
        <ul>
          <li className="article_list">
            <Rate style={{ fontSize: "1rem" }} disabled value={mainStore.acmCard?.rate} />
          </li>
          {mainStore.acmCard?.tags.map((tag, i) => {
            return (
              <li key={i} className="article_tag tag">
                {tag}
              </li>
            );
          })}
        </ul>
      </div>
      <Divider />
      <Row className="article_content">
        <Col md={24} lg={10}>
          <img alt="tour_acm_redcommendation_img" src={mainStore.acmCard?.src} />
        </Col>
        <Col md={24} lg={14}>
          <p>{mainStore.acmCard?.desc}</p>
        </Col>
      </Row>
    </div>
  );
});

export default ArticleBox;
