// прописать deadline={'2024-02-05T18:00:00.000Z'}
import React, { useState, useEffect } from "react";
import formatDate from "../../utils/formateDate";
import Time from "../../ui/icons/time";
import CompleteIcon from "../../ui/icons/statusTask/complete";
import "./DeadlineBlock.scss";

interface DeadlineBlockProps {
  deadline: string | undefined;
  status: string | undefined;
}

const DeadlineBlock: React.FC<DeadlineBlockProps> = ({ deadline, status }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(
    calculateTimeRemaining()
  );

  function calculateTimeRemaining(): number {
    const now = new Date();
    const deadlineDate = new Date(deadline!);
    const timeDiff = deadlineDate.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return 0;
    }
    return timeDiff;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 60 * 1000); // обновляется каждую минуту

    return () => clearInterval(timer);
  }, [deadline]);

  const formatTime = (ms: number): string => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days} д. ${hours} ч.`;
  };

  return (
    <div className="deadline">
      <span className="deadline__title">{formatTime(timeRemaining)}</span>
      <p className="deadline__description">
        Готовность: {formatDate(deadline!)}г.
      </p>
      <div className="deadline__icon">
        {status === "complete" ? <CompleteIcon /> : <Time />}
      </div>
    </div>
  );
};

export default DeadlineBlock;
