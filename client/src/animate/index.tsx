import { motion } from "framer-motion";

interface FloatingShapeProps {
  color: string; // You can refine this type if you have specific color options
  size: string; // You can refine this type if you have specific size options
  top: string | number; // Assuming top can be a percentage (e.g., "50%") or a pixel value (e.g., 100)
  left: string | number; // Same reasoning as top
  delay?: number; // delay is optional
}

const FloatingShape: React.FC<FloatingShapeProps> = ({
  color,
  size,
  top,
  left,
  delay = 0, // Default delay to 0 if not provided
}) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
      style={{ top, left }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden='true'
    />
  );
};

export default FloatingShape;
