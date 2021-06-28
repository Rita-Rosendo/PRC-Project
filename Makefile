up :
	docker-compose up --build

down :
	docker-compose down --rmi local

rm_volume:
	docker volume rm lei2_mgdata