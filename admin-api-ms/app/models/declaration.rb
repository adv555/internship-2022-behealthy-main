class Declaration < ApplicationRecord
  self.table_name = "Declarations"

  belongs_to :family_practitioner
  belongs_to :patient

  before_create :set_status_on_create
  after_create :generate_pdf_link

  private
  def set_status_on_create
    self.status = 'REQUESTED'
  end

  private
  def generate_pdf_link
    self.pdf = "http://localhost:3002/api/v1/declarations/pdf/#{self.id}.pdf"
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
