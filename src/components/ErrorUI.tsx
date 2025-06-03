import styled from "styled-components";

interface ErrorUIProps {
  status?: number;
  message?: string;
}

export function ErrorUI({ status, message }: ErrorUIProps) {
  const getErrorMessage = () => {
    switch (status) {
      case 400:
        return "잘못된 요청입니다.";
      case 401:
        return "로그인이 필요합니다.";
      case 403:
        return "접근 권한이 없습니다.";
      case 404:
        return "요청한 리소스를 찾을 수 없습니다.";
      case 500:
        return "서버 오류가 발생했습니다.";
      default:
        return message || "알 수 없는 오류가 발생했습니다.";
    }
  };

  const getErrorIcon = () => {
    switch (status) {
      case 401:
        return "🔒";
      case 403:
        return "🚫";
      case 404:
        return "🔍";
      case 500:
        return "⚠️";
      default:
        return "❌";
    }
  };

  return (
    <ErrorWrapper role="alert" className="error-ui">
      <ErrorIcon className="error-icon">{getErrorIcon()}</ErrorIcon>
      <ErrorTitle className="error-title">{getErrorMessage()}</ErrorTitle>
      {message && <ErrorDetail className="error-detail">{message}</ErrorDetail>}
      <RetryButton
        className="retry-button"
        onClick={() => window.location.reload()}
      >
        새로고침
      </RetryButton>
    </ErrorWrapper>
  );
}

const ErrorWrapper = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  border: 1px solid #f44336;
  border-radius: 8px;
  background-color: #ffe6e6;
  text-align: center;
  box-shadow: 0 4px 10px rgba(244, 67, 54, 0.2);
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h2`
  margin: 0 0 1rem;
  color: #b71c1c;
  font-weight: 700;
`;

const ErrorDetail = styled.p`
  color: #7f0000;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  white-space: pre-line;
`;

const RetryButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }

  &:focus {
    outline: 2px solid #b71c1c;
    outline-offset: 2px;
  }
`;
