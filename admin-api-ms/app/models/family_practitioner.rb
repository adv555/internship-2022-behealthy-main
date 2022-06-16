class FamilyPractitioner < ApplicationRecord
  self.table_name = "family_practitioners"

  NAME_VALIDATION = /\A[\da-zA-Zа-яієёА-ЯІЄЁ\'\-\s]+\z/

  belongs_to :user
  has_many :declaration

  validates :first_name, presence: true, length: {maximum: 64}, format: NAME_VALIDATION
  validates :last_name, presence: true, length: {maximum: 64}, format: NAME_VALIDATION
  validates :gender, inclusion: {
    in: ["Male", "Female", "Other"]
  }

  validate :validate_birthdate

  private
  def validate_birthdate
    if birthdate.year > Time.new.year - 18 || birthdate.year < Time.new.year - 122
      errors.add(:birthdate, "must be between #{Time.new.year - 122} and #{Time.new.year - 18}")
    end
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