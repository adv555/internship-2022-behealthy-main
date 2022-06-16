class Api::V1::DeclarationsController < ApplicationController
  def index
    declarations = Declaration.all
    render json: declarations, status: :ok
  end

  def show 
    declaration = Declaration.find_by(id: params[:id])

    if declaration
      render json: declaration, status: :ok
    else
      render json: { message: "User not found" }, status: :not_found
    end 
  end

  def show_all_by_practitioner_id
    declarations = Declaration.where(family_practitioner_id: params[:id])

    if declarations.length != 0
      render json: declarations.to_json(include: :patient), status: :ok
    else 
      render json: { message: "Declarations for practitioner with the id #{params[:id]} not found" }, status: :not_found
    end
  end

  def show_all_by_patient_id
    declarations = Declaration.where(patient_id: params[:id])

    if declarations.length != 0
      render json: declarations, status: :ok
    else 
      render json: { message: "Declarations for patient with the id #{params[:id]} not found" }, status: :not_found
    end
  end

  def show_all_by_status_and_id
    declarations = Declaration.where(family_practitioner_id: params[:id], status: params[:status])

    if declarations.length != 0
      render json: declarations.to_json(include: :patient), status: :ok
    else 
      render json: { message: "Declarations with status #{params[:status]} for practitioner with the id #{params[:id]} not found" }, status: :not_found
    end
  end

  def create
    declaration = Declaration.create(declaration_params)

    if declaration.save
      render json: declaration, status: :created
    else
      render json: { message: "Creating failed" }, status: :bad_request
    end
  end

  def update
    declaration = Declaration.find_by(id: params[:id])

    if declaration
      declaration.update(declaration_params)
      render json: declaration, status: :ok
    else
      render jons: { message: "Declaration not found" }, status: :not_found
    end
  end

  def destroy
    declaration = Declaration.find_by(id: params[:id])

    unless declaration
      render json: { message: "Declaration not found" }, status: :not_found
    end

    if declaration.destroy
      render json: { message: "Declaration with the #{params[:id]} was deleted" }, status: :ok
    else
      render json: { message: "Cannot delete the declaration" }, status: :bad_request
    end
  end

  def pdf_declaration
    declaration = Declaration.find_by(id: params[:id])

    respond_to do |format|
      format.pdf do
        pdf = DeclarationPdf.new(declaration)

        send_data pdf.render, filename: "declaration_#{declaration.id}.pdf", disposition: :inline
      end
    end
  end

  private
  def declaration_params
    params.require(:declaration).permit(
      :status,
      :patient_id,
      :family_practitioner_id
    )
  end
end
