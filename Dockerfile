# Use the official Python image from the Docker Hub
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file to the working directory
COPY requirements.txt /app/

# Install the dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy the rest of the application code to the working directory
COPY ./templates /app/templates
COPY ./website /app/website
COPY ./www_fortkentcinema_com /app/www_fortkentcinema_com
COPY .env /app/.env
COPY .manage.py /app/


# Expose port 8000 to the outside world
EXPOSE 8000

# Run the application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "www_fortkentcinema_com.wsgi:application"]
