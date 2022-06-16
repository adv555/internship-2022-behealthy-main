Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[index show create update destroy]
      resources :patient, only: %i[index show create update destroy]
      resources :family_practitioner, only: %i[index show create update destroy]
      resources :activation, only: %i[show]
      resources :declarations, only: %i[index show create update destroy]
      resources :admins, only: %i[index show update destroy]

      post '/admins/registration', to: 'admins#registration'
      post '/admins/login', to: 'admins#login'

      get '/family_practitioner/user/:user_id', to: 'family_practitioner#show_by_user_id'
      get '/patient/user/:user_id', to: 'patient#show_by_user_id'

      get '/declarations/family_practitioner/:id', to: 'declarations#show_all_by_practitioner_id'
      get '/declarations/patient/:id', to: 'declarations#show_all_by_patient_id'
      get '/declarations/family_practitioner/:id/:status', to: 'declarations#show_all_by_status_and_id'
      get '/declarations/pdf/:id', to: 'declarations#pdf_declaration'
    end
  end

  
end
