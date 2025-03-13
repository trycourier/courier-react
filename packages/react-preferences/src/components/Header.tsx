import { usePreferences } from "@trycourier/react-hooks";
import React from "react";
import styled from "styled-components";

export const Header: React.FunctionComponent = () => {
  const preferences = usePreferences();

  const HeaderWrapper = styled.div`
    margin-top: 60px;
    padding-top: 16px;
    width: 100%;
  `;

  const ImageWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
    h1 {
      font-size: 32px;
      margin: 0;
    }
  `;

  const Image = styled.div`
    img {
      max-height: 36px;
    }
  `;

  const FreeTierText = styled.div`
    p {
      padding: 8px 0;
      font-size: 10px;
      margin: 0;
      color: #73819b;
      font-style: normal;
      font-weight: 400;
      font-size: 10px;
      line-height: 14px;

      span {
        font-weight: bold;
      }
    }

}`;

  const Header = styled.h1`
    margin: 0;
    padding: 8px 0 0 0;
    font-size: 32px;
    font-weight: 800;
    line-height: 44px;
  `;

  const SubHeader = styled.p`
    margin: 0;
    padding: 16px 0;
    color: #73819b;
    font-weight: 300;
    font-size: 12px;
  `;

  if (preferences.isLoading || !preferences.preferencePage) {
    return null;
  }

  return (
    <HeaderWrapper>
      <ImageWrapper>
        <Image>
          {preferences.preferencePage.brand.logo.image ? (
            <img src={`${preferences.preferencePage.brand.logo.image}`} />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 0 373 85"
              fill="none"
            >
              <path
                d="M79.4 38.3C79.6 38 79.7 37.7 79.6 37.4C76.3 18.7 60 4.5 40.4 4.5C18.3 4.5 0.399987 22.5 0.599987 44.6C0.799987 66.1 18.8 84.1 40.3 84.1C58.5 84.1 73.9 72 78.7 55.3C78.9 54.7 78.6 54.1 78 53.9L76.4 53.3C70 51 62.9 51.9 57.3 55.5C54.7 57.2 52.8 58.6 52.8 58.6C49.6 60.8 45.6 62.1 41.4 62.1C30.2 62.1 22.3 52.9 21.1 41.8L20.2 35.7C19.9 33.8 18.7 32.3 16.9 31.6L14.6 30.7C14.2 30.5 14.1 30.1 14.3 29.7C23.9 16.9 35.7 19.6 35.7 19.6C37.8 19.8 39.6 20.6 41 21.5C43.1 22.9 44.7 25 45.7 27.3C49.3 35.6 57.6 41.4 67.2 41.4C67.2 41.4 76.4 41.8 79.4 38.3Z"
                fill="#2C1437"
              />
              <path
                d="M25.1 28.7C26.3702 28.7 27.4 27.6703 27.4 26.4C27.4 25.1298 26.3702 24.1 25.1 24.1C23.8297 24.1 22.8 25.1298 22.8 26.4C22.8 27.6703 23.8297 28.7 25.1 28.7Z"
                fill="#2C1437"
              />
              <path
                d="M25.6 40.8C26.2 44.4 29 55.9 41.8 58C42 58 42.1 57.8 41.9 57.7C39 56.3 31.2 51.9 26 40.7C25.8 40.6 25.6 40.6 25.6 40.8Z"
                fill="#2C1437"
              />
              <path
                d="M141.2 54.9C141.2 71.1 128.9 83.2 112.8 83.2C96.7 83.2 84.5 71.1 84.5 54.9C84.5 38.5 96.7 26.3 112.8 26.3C128.9 26.3 141.2 38.5 141.2 54.9ZM102 54.9C102 61.3 106.7 66.1001 112.9 66.1001C119.2 66.1001 123.9 61.3 123.9 54.9C123.9 48.2 119.2 43.4 112.9 43.4C106.6 43.4 102 48.3 102 54.9Z"
                fill="#2C1437"
              />
              <path
                d="M199.8 56.7C199.8 72.2 188.9 83.2 173.6 83.2C158.2 83.2 147.2 72.2 147.2 56.7V27.4H165V56.7C165 62.5 168.3 66.1 173.7 66.1C178.8 66.1 182.2 62.4 182.2 56.7V27.4H199.8V56.7Z"
                fill="#2C1437"
              />
              <path
                d="M243.6 27V43.2C241.6 42.9 239.7 42.5 237.9 42.5C230.5 42.5 224.5 46.4 224.5 56.8V82.1H206.8V27.4H224.5V33.2C227.7 28.9 232.4 26.4 238.4 26.4C240 26.4 241.7 26.6 243.6 27Z"
                fill="#2C1437"
              />
              <path
                d="M269.9 10.8C269.9 16.6 265.1 21.4 259.4 21.4C253.6 21.4 248.8 16.5 248.8 10.8C248.8 5.10003 253.7 0.300027 259.4 0.300027C265.1 0.200027 269.9 5.10003 269.9 10.8ZM268.1 27.4V82.1H250.4V27.4H268.1Z"
                fill="#2C1437"
              />
              <path
                d="M329.4 59.4H290.4C291.7 65.1 296.4 68.6 302.5 68.6C307.8 68.6 310.8 66.4 311.6 63.4H329C327.3 75.5 317 83.3 303 83.3C286.8 83.3 274.2 70.8 274.2 54.7C274.2 38.7 286.6 26.4 302.7 26.4C317.6 26.4 329.9 38.2 329.9 53.1C329.8 54.5 329.6 57.4 329.4 59.4ZM311.2 48.2C310.8 43.8 306.5 40.8 301.8 40.8C296.9 40.8 293 43 291.2 48.2H311.2Z"
                fill="#2C1437"
              />
              <path
                d="M372.7 27V43.2C370.7 42.9 368.8 42.5 367 42.5C359.6 42.5 353.6 46.4 353.6 56.8V82.1H335.9V27.4H353.6V33.2C356.8 28.9 361.5 26.4 367.5 26.4C369.1 26.4 370.8 26.6 372.7 27Z"
                fill="#2C1437"
              />
            </svg>
          )}
        </Image>
      </ImageWrapper>
      {preferences.preferencePage.showCourierFooter && (
        <FreeTierText>
          <p>
            POWERED BY <span>COURIER</span>
          </p>
        </FreeTierText>
      )}
      <Header>Notification Preferences</Header>
      <SubHeader>
        For the categories listed below, you can choose how you’d like to be
        reached.
      </SubHeader>
    </HeaderWrapper>
  );
};
