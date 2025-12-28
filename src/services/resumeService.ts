import api from '../config/API';

export interface Template {
  theme: string;
  colorPalette: string[];
}

export interface ProfileInfo {
  profilePreviewUrl: string | null;
  fullName: string | null;
  designation: string | null;
  summary: string | null;
}

export interface ContactInfo {
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedIn: string | null;
  github: string | null;
  website: string | null;
}

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  name: string;
  progress: number;
}

export interface Project {
  title: string;
  description: string;
  github: string;
  liveDemo: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
}

export interface Language {
  name: string;
  progress: number;
}

export interface Resume {
  _id: string;
  userId: string;
  title: string;
  thumbnailLink: string | null;
  template: Template | null;
  profileInfo: ProfileInfo;
  contactInfo: ContactInfo;
  workExperiences: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  interests: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateResumePayload {
  title: string;
}

export interface UpdateResumePayload {
  title?: string;
  template?: Template;
  profileInfo?: Partial<ProfileInfo>;
  contactInfo?: Partial<ContactInfo>;
  workExperiences?: WorkExperience[];
  education?: Education[];
  skills?: Skill[];
  projects?: Project[];
  certifications?: Certification[];
  languages?: Language[];
  interests?: string[];
}

class ResumeService {
  async createResume(payload: CreateResumePayload): Promise<Resume> {
    const response = await api.post<Resume>('/resume', payload);
    return response.data;
  }

  async getResume(id: string): Promise<Resume> {
    const response = await api.get<Resume>(`/resume/${id}`);
    return response.data;
  }

  async getAllResumes(): Promise<Resume[]> {
    const response = await api.get<Resume[]>('/resume');
    return response.data;
  }

  async updateResume(
    id: string,
    payload: UpdateResumePayload
  ): Promise<Resume> {
    const response = await api.put<Resume>(`/resume/${id}`, payload);
    return response.data;
  }

  async deleteResume(id: string): Promise<void> {
    await api.delete(`/resume/${id}`);
  }

  async duplicateResume(id: string): Promise<Resume> {
    const response = await api.post<Resume>(`/resume/${id}/duplicate`);
    return response.data;
  }
}

export const resumeService = new ResumeService();
