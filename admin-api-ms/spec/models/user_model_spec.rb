require 'rails_helper'

describe User, type: :model do
  subject {
    User.new(
      email: "john@gmail.com", 
      password: "Qwerty@123", 
      role: "PATIENT"
    )
  }

  it 'is valid with valide data' do
    expect(subject).to be_valid
  end

  it 'is not valid without email' do
    subject.email = nil
    expect(subject).to_not be_valid
  end

  it 'is not valid without password' do
    subject.password = nil
    expect(subject).to_not be_valid
  end

  it 'is not valid without role' do
    subject.role = nil
    expect(subject).to_not be_valid
  end
end