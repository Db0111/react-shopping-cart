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
    <div className="error-ui" role="alert">
      <div className="error-icon">{getErrorIcon()}</div>
      <h2 className="error-title">{getErrorMessage()}</h2>
      {message && <p className="error-detail">{message}</p>}
      <button className="retry-button" onClick={() => window.location.reload()}>
        새로고침
      </button>
    </div>
  );
}
