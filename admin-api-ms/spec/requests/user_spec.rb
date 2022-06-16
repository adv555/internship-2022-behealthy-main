require 'rails_helper'

describe 'Users API', type: :request do
   describe 'GET /users' do
    before do
      FactoryBot.create(:user, 
        email: "john@gmail.com", 
        password: "Qwerty@123", 
        role: "PATIENT"
      )
  
      FactoryBot.create(:user, 
        email: "james@gmail.com", 
        password: "Test@123", 
        role: "PRACTITIONER"
      )
    end

    it 'returns all users' do
      get '/api/v1/users'
  
      expect(response).to have_http_status :ok
      expect(JSON.parse(response.body).size).to eq(2)
    end
  end

  describe 'POST /users' do
    it 'creates a new user' do
      expect {
        post '/api/v1/users', params: {
          user: {
            email: "john@gmail.com", 
            password: "Qwerty@123", 
            role: "PATIENT"    
          }
        }
      }.to change { User.count }.from(0).to(1)

      expect(response).to have_http_status :created
    end
  end

  describe 'DELETE /users/:id' do
    let!(:user) do
      user = FactoryBot.create(:user, 
        email: "james@gmail.com", 
        password: "Qwerty@123", 
        role: "PATIENT"
      )
    end

    it "deletes a user" do
      expect {
        delete "/api/v1/users/#{user.id}"
      }.to change { User.count }.from(1).to(0)

      expect(response).to have_http_status :no_content
    end
  end
end