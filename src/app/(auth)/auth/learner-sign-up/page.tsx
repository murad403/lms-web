import React from 'react';
import LearnerSignUpForm from './LearnerSignUpForm';
import LearnerSignUpFlow from './LearnerSignUpFlow';

const LearnerSignUp = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <LearnerSignUpForm />
      <LearnerSignUpFlow />
    </div>
  );
};

export default LearnerSignUp;
