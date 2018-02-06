Rails.application.routes.draw do
  devise_for :users

  namespace :admin

  root 'homes#index'
  get "*path", to: "homes#index"
end
