import { useState } from "react";
import { Loader2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  return (
    <div className="loader-container">
      <Loader2 className="loader-icon" size={48} />
      <p>Loading...</p>
    </div>
  );
}

export function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <AlertCircle className="error-icon" size={48} />
      <p>{message}</p>
    </div>
  );
}

export function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
