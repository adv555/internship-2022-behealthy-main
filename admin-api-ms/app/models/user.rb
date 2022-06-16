class User < ApplicationRecord
  self.table_name = "Users"

  has_one :patient, dependent: :destroy
  has_one :family_practitioner, dependent: :destroy

  PASSWORD_REQUIREMENTS = /\A(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[a-zA-Z]).{8,64}/x

  before_create :add_activation_link, :hash_password

  validates :email, presence: true, length: { maximum: 320 }, format: {
    with: URI::MailTo::EMAIL_REGEXP
  }
  validates :password, presence: true, format: PASSWORD_REQUIREMENTS
  validates :role, inclusion: {
    in: ["PATIENT", "PRACTITIONER", "ADMIN"]
  }

  private
  def add_activation_link
    uuid = UUID.new
    activationLink = uuid.generate

    self.activationLink = activationLink
  end

  private
  def hash_password
    hash = BCrypt::Password.create(self.password)
    self.password = hash
  end

  private
  def self.timestamp_attributes_for_create
    super << "createdAt"
  end

  private
  def self.timestamp_attributes_for_update
    super << "updatedAt"
  end
end
