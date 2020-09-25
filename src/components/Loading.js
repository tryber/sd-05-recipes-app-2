import React from 'react';
import { BackgroundBody } from '../StyledComps';

export default function Loading() {
  return (
    <BackgroundBody className="loading-page">
      <span className="loading-text">Carregando...</span>
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only loading-spin">Loading...</span>
        </div>
      </div>
    </BackgroundBody>
  );
}
