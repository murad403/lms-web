import React from 'react';
import OrganizationSignUpForm from './OrganizationSignUpForm';
import OrganizationSignUpFlow from './OrganizationSignUpFlow';

const OrganizationSignUp = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <OrganizationSignUpForm />
      <OrganizationSignUpFlow />
    </div>
  );
};

export default OrganizationSignUp;
