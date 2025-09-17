import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

interface CyclicTypewriterTextProps {
  texts: string[]; // 支持多个文本轮换
  speed?: number;
  className?: string;
  delay?: number;
  cycleInterval?: number; // 循环间隔时间（毫秒）
}

export const CyclicTypewriterText: React.FC<CyclicTypewriterTextProps> = ({
  texts,
  speed = 100,
  className = '',
  delay = 0,
  cycleInterval = 8000 // 默认8秒
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0); // 当前显示的文本索引
  const [isStarted, setIsStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(true); // true: 打字中, false: 删除中
  const [showCursor, setShowCursor] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false); // 是否在轮换间隔期间
  
  const currentText = texts[currentTextIndex] || '';

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    let timer: NodeJS.Timeout;

    if (isTyping) {
      // 打字阶段
      if (currentIndex < currentText.length) {
        timer = setTimeout(() => {
          setDisplayedText(prev => prev + currentText[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
      } else {
        // 打字完成，进入等待状态，隐藏光标
        setIsWaiting(true);
        timer = setTimeout(() => {
          setIsWaiting(false);
          setIsTyping(false);
        }, cycleInterval - currentText.length * speed);
      }
    } else {
      // 删除阶段
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, speed / 2); // 删除速度比打字快一倍
      } else {
        // 删除完成，切换到下一个文本并重新开始打字
        setCurrentTextIndex(prev => (prev + 1) % texts.length);
        setIsTyping(true);
        setCurrentIndex(0);
      }
    }

    return () => clearTimeout(timer);
  }, [currentIndex, currentText, speed, isStarted, isTyping, displayedText, cycleInterval, texts.length]);

  // 光标闪烁效果
  useEffect(() => {
    if (isWaiting) {
      // 在等待期间隐藏光标
      setShowCursor(false);
      return;
    }

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, [isWaiting]);

  return (
    <span className={`${styles.typewriter} ${className}`}>
      {displayedText}
      {showCursor && !isWaiting && (
        <span className={styles.cursor}>|</span>
      )}
    </span>
  );
};

export default CyclicTypewriterText;