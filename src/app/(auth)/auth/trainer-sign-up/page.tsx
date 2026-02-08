import React from 'react';
import TrainerSignUpForm from './TrainerSignUpForm';
import TrainerSignUpFlow from './TrainerSignUpFlow';

const TrainerSignUp = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <TrainerSignUpForm />
      <TrainerSignUpFlow />
    </div>
  );
};

export default TrainerSignUp;
