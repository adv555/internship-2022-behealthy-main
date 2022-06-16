class Admin < ApplicationRecord
  has_secure_password

  PASSWORD_REQUIREMENTS = /\A(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[a-zA-Z]).{8,64}/x

  validates :email, presence: true, length: { maximum: 320 }, format: {
    with: URI::MailTo::EMAIL_REGEXP
  }
  validates :password, presence: true, format: PASSWORD_REQUIREMENTS
end
