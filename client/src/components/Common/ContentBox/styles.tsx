import { BLUE_COLOR, LG_SIZE, SM_SIZE, WHITE_COLOR } from "../../../config";
import styled from "@emotion/styled";

export const ContentBoxWrapper = styled.article`
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
        }
        .title_desc {
          margin-right: 1rem;
        }
      }
      &_subtitle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .content_list {
          display: flex;
        }
        .content_tag {
          user-select: none;
          margin-right: 0.5rem;
          &:hover {
            transform: scale(1.05);
          }
        }
        .content_rate {
          margin-right: 1rem;
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
        p {
          height: 250px;
          overflow-y: auto;
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
          p {
            height: 100%;
          }
        }
        &_text_attractions {
          margin: 1rem 0 1.5rem 0;
          padding: 0;
          p {
            height: 230px;
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
          .content_rate {
            display: none;
          }
          .content_tag {
            margin-top: 0.5rem;
            font-size: 0.6rem;
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
        }
      }
    }
  }
`;
