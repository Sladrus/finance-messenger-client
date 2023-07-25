import React, { useState } from 'react';
import { useLayer, Arrow } from 'react-laag';
import { motion, AnimatePresence } from 'framer-motion';
const CoursePopover = ({
  courseOpen,
  currency,
  expression,
  renderLayer,
  layerProps,
}) => {
  return (
    <div>
      {renderLayer(
        <AnimatePresence>
          {courseOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="toolbar-popover"
              {...layerProps}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px',
                }}
              >
                <span
                  style={{
                    fontSize: '18px',
                    color: 'white',
                    fontWeight: '500',
                  }}
                >
                  Рассчитываю курс:
                </span>
                <span>
                  {expression !== 'NaN'
                    ? `${currency}: ${expression}`
                    : 'Ошибка, проверьте правильность ввода'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default CoursePopover;
