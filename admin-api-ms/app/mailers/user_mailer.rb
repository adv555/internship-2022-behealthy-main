class UserMailer < ApplicationMailer
  def activation_link
    @user = params[:user]
    @link = @user.activationLink

    mail(
      to: @user.email, 
      subject: "Activate your account"
    )
  end
end
