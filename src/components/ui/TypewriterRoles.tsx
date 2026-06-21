import { useEffect, useState } from 'react';

interface TypewriterRolesProps {
  roles?: string[];
  className?: string;
}

export const TypewriterRoles = ({ 
  roles = ["MERN Stack Developer", "React Developer", "Full Stack Engineer", "Problem Solver"], 
  className = "" 
}: TypewriterRolesProps) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: any;
    const fullText = roles[currentRoleIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          // Wait before starting to delete
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, roles, typingSpeed]);

  return (
    <span className={`${className} inline-block min-h-[1.2em]`}>
      {currentText}
      <span className="animate-pulse text-spiderman-red font-light">|</span>
    </span>
  );
};
