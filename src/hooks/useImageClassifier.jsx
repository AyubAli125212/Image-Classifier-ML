import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

const useImageClassifier = (imageId) => {
  const [classificationResult, setClassificationResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const classifyImage = async () => {
      try {
        const img = document.getElementById(imageId);

        if (!img) {
          throw new Error(`Image element not found with ID: ${imageId}`);
        }

        setIsLoading(true);

        await Promise.all([tf.setBackend("webgl"), mobilenet.load()])
          .then(async ([, model]) => {
            // Classify the image.
            const predictions = await model.classify(img);

            // Get the top prediction.
            const topPrediction = predictions[0].className;

            if (isMounted) {
              setClassificationResult(topPrediction);
            }
          })
          .catch((loadError) => {
            throw new Error(`Error loading model: ${loadError}`);
          });
      } catch (classifyError) {
        if (isMounted) {
          setError(classifyError.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    classifyImage();

    return () => {
      isMounted = false;
    };
  }, [imageId]);

  return {
    classificationResult,
    error,
    isLoading,
  };
};

export default useImageClassifier;
